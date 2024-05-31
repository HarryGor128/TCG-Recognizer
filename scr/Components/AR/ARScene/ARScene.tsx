import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    Viro3DObject,
    ViroARImageMarker,
    ViroARScene,
    ViroNode,
} from '@viro-community/react-viro';

import useDebounce from '../../../Hook/Common/useDebounce';
import useNickname from '../../../Hook/useNickname';
import commonService from '../../../Services/Common/commonService';
import firebaseService from '../../../Services/Common/firebaseService';
import OnlinePlayerList from '../../../Type/AR/OnlinePlayerList';
import PopupCardListContext from '../PopupCardList/Context/PopupCardListContext';

interface ARSceneProps {
    targetCardList: string[];
    setTargetCardList: Dispatch<SetStateAction<string[]>>;
}

const ARScene = () => {
    const [yAxis, setYAxis] = useState<number>(0);

    const { nickname, getNickname } = useNickname();

    const { targetCardList, setTargetCardList } =
        useContext(PopupCardListContext);

    const { debounce } = useDebounce();

    useEffect(() => {
        const incrementYAxis = async () => {
            await commonService.sleep(100);
            setYAxis((prev) => {
                return prev < 360 ? prev + 1 : 0;
            });
        };

        incrementYAxis();
    }, [yAxis]);

    useEffect(() => {
        const addToFirebase = async () => {
            const cardList: OnlinePlayerList = {
                cardList: targetCardList,
                id: nickname,
            };

            await firebaseService.addDocByID('AR', nickname, cardList);
        };

        debounce(() => {
            getNickname();
            if (nickname && targetCardList.length > 0) {
                addToFirebase();
            }
        });
    }, [targetCardList, nickname]);

    const addCard = (target: string) => {
        console.log('🚀 ~ file: ARScene.tsx:50 ~ addCard ~ target:', target);
        setTargetCardList((prevList) => {
            const newList: string[] = JSON.parse(JSON.stringify(prevList));
            const findCard = newList.find((item) => item === target);

            if (!findCard) {
                newList.push(target);
            }

            return newList;
        });
    };

    return (
        <ViroARScene style={{ flex: 1 }}>
            <ViroARImageMarker
                target={'QCDB_JP009'}
                onHover={(isHovering) => {
                    if (isHovering) {
                        addCard('89631146');
                    }
                }}
            >
                <ViroNode
                    scale={[0.005, 0.005, 0.005]}
                    rotation={[0, -90, 0]}
                    dragType={'FixedToWorld'}
                >
                    <Viro3DObject
                        source={require('../../../Assets/AR/3DModel/QCDB-JP009.obj')}
                        type={'OBJ'}
                        rotation={[0, yAxis, 0]}
                    />
                </ViroNode>
            </ViroARImageMarker>
            <ViroARImageMarker
                target={'DE03JP015'}
                onHover={(isHovering) => {
                    if (isHovering) {
                        addCard('44508094');
                    }
                }}
            >
                <ViroNode
                    scale={[0.003, 0.003, 0.003]}
                    rotation={[0, -90, 0]}
                    dragType={'FixedToWorld'}
                >
                    <Viro3DObject
                        source={require('../../../Assets/AR/3DModel/DE03JP015.obj')}
                        type={'OBJ'}
                        rotationPivot={[0, 0, 30]}
                        position={[0, 20, -30]}
                        rotation={[0, yAxis, 0]}
                    />
                </ViroNode>
            </ViroARImageMarker>
        </ViroARScene>
    );
};

export default ARScene;
