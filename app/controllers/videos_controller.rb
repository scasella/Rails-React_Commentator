class VideosController < ApplicationController
skip_before_action :verify_authenticity_token

    def index
      @video = Video.last(1)

      if request.xhr?
        render :json => Video.last(1)
      end
    end

    def create
      @video = Video.new(video_params)
      @video.save

      

      if request.xhr?
        render :json => Video.last(1)
      else
        render nothing: true
      end
    end

    private

    def video_params
      params.require(:video).permit(:url, :time, :poster, :watching)
    end
end
