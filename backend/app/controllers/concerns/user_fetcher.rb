module UserFetcher
  extend ActiveSupport::Concern

  included do
    before_action :fetch_or_create_user
  end

  private

  def fetch_or_create_user
    token = cookies[:browser_token]
    Rails.logger.info "Fetching user with token: #{token}"

    if token && (user = User.find_by(browser_token: token))
      @current_user = user
      Rails.logger.info "Found existing user: #{user.id}"
    else
      new_token = SecureRandom.uuid
      random_name = RANDOM_USERNAMES.sample
      @current_user = User.create!(browser_token: new_token, name: random_name, image: "/icon-#{rand(0..12)}.png")
      Rails.logger.info "Created new user: #{@current_user.id} with token: #{new_token} and name: #{random_name}"
      response.set_cookie(:browser_token, {
        value: new_token,
        expires: 10.years.from_now,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax,
        path: '/'
      })
    end
  end

  RANDOM_USERNAMES = [
    "Sussy Snake", "Sly Fox", "Mad Dog", "Inquisitive Bee", "Clever Cat", "Jolly Giraffe",
    "Witty Owl", "Brave Lion", "Curious Monkey", "Playful Penguin", "Sneaky Raccoon", "Wise Elephant",
    "Cheerful Dolphin", "Daring Eagle", "Friendly Panda", "Graceful Swan", "Hilarious Hyena", "Inventive Octopus",
    "Jazzy Jaguar", "Kind Koala", "Lively Lemur", "Mighty Mouse", "Noble Narwhal", "Optimistic Otter",
    "Proud Peacock", "Quirky Quokka", "Resilient Rhino", "Spirited Squirrel", "Tenacious Tiger", "Unique Unicorn",
    "Valiant Vulture", "Whimsical Walrus", "Xenial Xerus", "Youthful Yak", "Zealous Zebra", "Agile Antelope",
    "Bouncy Bunny", "Crafty Coyote", "Dazzling Dragonfly", "Energetic Emu", "Fierce Falcon", "Gentle Gazelle",
    "Harmonious Hummingbird", "Imaginative Iguana", "Joyful Jellyfish", "Keen Kangaroo", "Loyal Lynx", "Majestic Moose",
    "Nimble Nightingale", "Observant Ocelot", "Persistent Puffin", "Quick Quail", "Radiant Robin", "Serene Sloth",
    "Thoughtful Toucan", "Upbeat Uakari", "Vivacious Vole", "Watchful Wombat", "Xtra Xiphias", "Yielding Yellowhammer",
    "Zestful Zorilla", "Adventurous Albatross", "Bubbly Badger", "Charming Chameleon", "Diligent Dingo", "Eager Echidna",
    "Fearless Ferret", "Gregarious Gorilla", "Humble Hedgehog", "Intrepid Ibex", "Jovial Jay", "Kindhearted Kiwi",
    "Loquacious Llama", "Merry Meerkat", "Nifty Newt", "Outgoing Opossum", "Perky Platypus", "Quizzical Quetzal",
    "Resolute Rhinoceros", "Savvy Salamander", "Tranquil Turtle", "Unassuming Uguisu", "Valorous Viper", "Winsome Wolf",
    "Xenodochial X-ray Tetra", "Yare Yapok", "Zany Zebu", "Affable Axolotl", "Blithe Bison", "Cordial Capybara",
    "Debonair Dodo", "Effervescent Elk", "Fanciful Flamingo", "Genial Gecko", "Hearty Hippopotamus", "Idealistic Ibis",
    "Jaunty Jackrabbit", "Kooky Kookaburra", "Luminous Leopard", "Mirthful Manatee", "Noble Numbat", "Offbeat Okapi"
  ]
end