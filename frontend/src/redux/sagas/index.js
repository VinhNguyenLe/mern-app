import { takeLatest, call, put } from "redux-saga/effects"
import * as actions from "../actions"
import * as api from "../../api"

function* fetchPostSaga(action){
    try{
        const posts = yield call(api.fetchPosts)
        console.log("[posts]: ", posts);
        yield put(actions.getPosts.getPostsSuccess(posts.data))
    } catch(err){
        console.log("🚀 ~ file: index.js ~ line 11 ~ function*fetchPostSaga ~ err", err)
        yield put(actions.getPosts.getPostsFailure(err))
    }
}

function* createPostSaga(action){
    try{
        const posts = yield call(api.createPost, action.payload)
        console.log("[posts]: ", posts);
        yield put(actions.createPost.createPostSuccess(posts.data))
    } catch(err){
        console.log("🚀 ~ file: index.js ~ line 11 ~ function*fetchPostSaga ~ err", err)
        yield put(actions.createPost.createPostFailure(err))
    }
}

function* updatePostSaga(action){
    try{
        const updatedPosts = yield call(api.updatePost, action.payload)
        console.log("[updatedPosts]: ", updatedPosts);
        yield put(actions.updatePost.updatePostSuccess(updatedPosts.data))
    } catch(err){
        console.log("🚀 ~ file: index.js ~ line 11 ~ function*fetchPostSaga ~ err", err)
        yield put(actions.updatePost.updatePostFailure(err))
    }
}

function* mySaga(){
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga)
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga)
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga)
}

export default mySaga