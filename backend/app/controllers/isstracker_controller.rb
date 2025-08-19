class IsstrackerController < ApplicationController
  include HTTParty
  BASE_URL = "http://api.open-notify.org/iss-now.json"

  def index
    response = HTTParty.get(BASE_URL)
    if response.success?
      render json: response.parsed_response
    else
      render json: { error: "Failed to fetch current ISS location" }, status: :bad_request
    end
  end
end