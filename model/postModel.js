import mongoose from 'mongoose'
import userModel, { findUserModelById } from './userModel.js'

const mongooseSchema = mongoose.Schema 

const postModelSchema = new mongooseSchema({
  owner: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    maxLength: 255
  },
  content: {
    type: String,
    maxLength: 2048
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now()
  }
})


// ユーザーから新規投稿を行う関数
const addPostModel = async ( postModelObj ) => {
  const newPostModel = new postModel( postModelObj )

  try {

    // バリデーション後に新しい投稿を登録
    const savedPostModel = await newPostModel.save()    

    // ユーザーモデルのpostに当該postを追加
    await findUserModelById( postModelObj.owner )
      .then((userModelWithId) => {
      userModelWithId.post.push(savedPostModel._id)
      return userModelWithId
    }).then((userModelWithId) => {
      userModelWithId.save()
    })


    // 登録に成功したら成功した投稿のオブジェクトを返す
    return savedPostModel
  }
  catch ( err ) {
    return err
  }
}

// ユーザーから投稿を削除する関数
const deletePostModel = async (postId) => {
  await postModel
    .findById(postId)
    .populate('owner')
    .exec((err, post) => {
      if ( err ) {
        return err
      }
      const posts = post.owner.post
      const index = posts.indexOf(postId)
      if (index > -1) {
        posts.splice(index, 1)
        post.owner.save()
      }
    })
    await postModel.findOneAndDelete({_id: postId})
  return "deleted."
}

const findPostModelByUser = ( userId ) => {
  const searchedPostModelWithUser = postModel.find({ owner: userId })
  searchedPostModelWithUser.catch(( err ) => {
    return `an Error ocurred in function \'findPostModelByUser\'. ${err}`
  })
  return searchedPostModelWithUser
}

const findPostModelById = ( postId ) => {
  const foundPostModelWithId = postModel.findById(postId)
  foundPostModelWithId.catch(( err ) => {
    return `an Error ocurred in function \'findPostModelById\'. ${err}`
  })
  return foundPostModelWithId
}

const findAllPosts = () => {
  const foundAllPosts = postModel.find({})
  return foundAllPosts
}

const postModel = mongoose.model('Post', postModelSchema)

export default postModel
export { addPostModel, deletePostModel, findPostModelByUser, findPostModelById, findAllPosts }