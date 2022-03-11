import { useSelector } from "react-redux";
import { DIALOG_TYPE } from "../../../utils/constants";
import ConfirmDialog from "./ConfirmDialog";

export default function DialogGroup() {

  const data = useSelector(state => state.common.dialog);

  const renderDialog = () => {
    const {type, isOpen, ...otherData} = data;
    if (!isOpen) {
      return null;
    }

    switch (type) {
      case DIALOG_TYPE.CONFIRM:
        return <ConfirmDialog {...otherData} />
      default:
        return null;
    }
  };

  return (renderDialog());
}