class AddToFromOmniAut < ActiveRecord::Migration[8.0]

  def self.from_omniauth(response)
    User.find_or_create_by(uid: response[:uid], provider: response[:provider]) do |user|
      user.username = response[:info][:name]
      user.email = response[:info][:email]
      user.password = SecureRandom.hex(16)
      random_name = RANDOM_USERNAMES.sample
      user.name = random_name
      user.image = "/icon-#{rand(0..12)}.png"
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
