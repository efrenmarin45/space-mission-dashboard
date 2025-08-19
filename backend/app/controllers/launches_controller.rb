class LaunchesController < ApplicationController
  include HTTParty
  BASE_URL = "https://ll.thespacedevs.com/2.3.0/launches/?limit=10&ordering=-last_updated"

  def index
    response = HTTParty.get(BASE_URL)
    if response.success?
      render json: response.parsed_response
    else
      render json: { error: "Failed to fetch launch data" }, status: :bad_request
    end
  end
end
