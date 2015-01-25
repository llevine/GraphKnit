# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Color.destroy_all

# array of colors to add to database for color palette
allColors = ['#5a5b5e','#313132','#1a1718','#caf0a1','#a1d06d','#6f8f4c','#366219','#2a4b13','#1b2f0c','#eeb7fa','#b671c7','#ab47c4','#9b00d6','#480061','#290037','#fff3b7','#ffe578','#fecd3a','#5a2f0f','#3d210a','#2a1807','#97999c','#e0e1e3','#ffffff','#a2c8fa','#62a3f8','#386eef','#2128d6','#090089','#09005b','#feb6b9','#fd9197','#f36d74','#fc2237','#fc0016','#8b000c','#fec3ad','#fd997a','#fd724c','#fd9550','#fd6725','#cc5c1f']

i = 0
while i < allColors.length  do
  Color.create(hexadecimal: allColors[i])
  i +=1
end