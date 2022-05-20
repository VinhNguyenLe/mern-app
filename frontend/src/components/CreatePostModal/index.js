import { Modal, TextareaAutosize, TextField, Button } from "@material-ui/core";
import FileBase64 from "react-file-base64"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalState$ } from "../../redux/selectors";
import useStyles from "./style";
import { createPost, hideModal } from "../../redux/actions";

export default function CreatePostModal() {
  const [data, setData] = React.useState({
    title: "",
    content: "",
    attachment: '',
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isShow } = useSelector(modalState$);

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
    setData({
      title: "",
      content: "",
      attachment: '',
    })
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    console.log({ data });
    dispatch(createPost.createPostRequest(data))
  }, [data, dispatch]);

  const body = (
    <div className={classes.paper} id="simple-modal-title">
      <h2>Create New Post</h2>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          className={classes.title}
          required
          label="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <TextareaAutosize
          className={classes.textarea}
          rowsMax={15}
          rowsMin={10}
          placeholder="Content..."
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />
        <FileBase64
          accept="image/*"
          multiple={false}
          type="file"
          value={data.attachment}
          onDone={({base64}) => setData({...data, attachment: base64})}
        />
        <div className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
            onClick={onSubmit}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <Modal open={isShow} onClose={onClose}>
      {body}
    </Modal>
  );
}
