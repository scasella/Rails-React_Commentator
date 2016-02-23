class CommentsController < ApplicationController

    def index
      @presenter = {
        :comments => Comment.last(50),
        :form => {
          :action => comments_path,
          :csrf_param => request_forgery_protection_token,
          :csrf_token => form_authenticity_token
        }
      }

      @comments = Comment.order(:created_at)
      respond_to do |format|
        format.html
        format.json
        format.csv { send_data @comments.as_csv }
      end

      if request.xhr?
        render :json => Comment.last(50)
      end
    end

    def create
      @comment = Comment.new(comment_params)
      @comment.save

    if request.xhr?
      render :json => Comment.last(50)
    else
      redirect_to comments_path
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:author, :text, :image)
  end

end
