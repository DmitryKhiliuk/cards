import {CardsPacksType} from "./cardsPacks-reducer";

type PackPropsType = {
    cardsPackName: any
}

export const Pack = (props: PackPropsType) => {
    return <div>
        {props.cardsPackName}
    </div>

}