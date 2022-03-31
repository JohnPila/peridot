import { useDispatch } from "react-redux";
import { confirmDialog } from "../../store/reducers/common";

export default function withDialog(Component) {
  function WithDialog(props) {
    const dispatch = useDispatch();
    const _confirmDialog = (title, content, callback, options) => {
      dispatch(confirmDialog(title, content, callback, options));
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