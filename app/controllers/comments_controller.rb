class CommentsController < ApplicationController

    def index
      @presenter = {
        :comments => Comment.last(10),
        :form => {
          :action => comments_path,
          :csrf_param => request_forgery_protection_token,
          :csrf_token => form_authenticity_token
        }
      }

      if request.xhr?
        render :json => Comment.last(10)
      end
    end

    def create
      @comment = Comment.new(comment_params)
      @comment.save

    if request.xhr?
      render :json => Comment.last(10)
    else
      redirect_to comments_path
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:author, :text, :image)
  end

end
