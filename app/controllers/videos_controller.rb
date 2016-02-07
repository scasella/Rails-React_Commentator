class VideosController < ApplicationController

    def index
      @video = Video.last(1)

      if request.xhr?
        render :json => Video.last(1)
      end
    end

    def create
      @video = Video.new(video_params)
      @video.save
    end

    private

    def video_params
      params.require(:url, :time, :poster, :watching)
    end
end
