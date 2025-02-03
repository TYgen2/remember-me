import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from 'react-native';

interface StarButtonProps {
    isStarred: boolean
    onPress: () => void
}

const StarButton = ({ isStarred, onPress }: StarButtonProps) => {
    return (
        <Pressable className="ml-auto" onPress={onPress}>
            <AntDesign name={isStarred ? "star" : "staro"} size={28} color="#2B2B2B" />
        </Pressable>
    )
}

export default StarButton;