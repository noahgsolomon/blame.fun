require "test_helper"

class WebSocketAuthControllerTest < ActionDispatch::IntegrationTest
  test "should get token" do
    get web_socket_auth_token_url
    assert_response :success
  end
end
