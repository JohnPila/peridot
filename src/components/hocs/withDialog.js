import { useDispatch } from "react-redux";
import { confirmDialog } from "../../store/reducers/common";

export default function withDialog(Component) {
  function WithDialog(props) {
    const dispatch = useDispatch();
    const _confirmDialog = (title, content, callback) => {
      dispatch(confirmDialog(title, content, callback));
    };

    return (
      <Component
        confirmDialog={_confirmDialog}
        {...props} 
      />
    );
  }

  return WithDialog;
}