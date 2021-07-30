import express from 'express';
import { findPostModelById } from '../model/postModel.js';

const postRouter = express.Router();

postRouter
  .get(
    '/:postId',
    async ( req, res ) => {
      const foundPostModelWithId = await findPostModelById( req.params.postId );
      res.send( foundPostModelWithId );
    },
  );

export default postRouter;
