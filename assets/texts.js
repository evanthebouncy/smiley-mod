var all_texts = {
    'smiley_svgs' : smiley_texts,
    'bike_svgs' : bike_texts,
    'gameboy_svgs' : gameboy_texts,
}

var paragraph_descriptions = {
    'smiley_svgs' : 'the smiley face is not too bad. the model understood the general structure of eyes and mouth. the bigger issue was getting the mouth exactly the right way. the model has little concept of "making things meet" with the arc, cannot line-up the semi-circle of the mouth well. commands such as "do blahblah such that the end-points meet" doesnt work, so I ended up using very low-level commands to manually move the geometries around.',
    'bike_svgs' : 'this was really painful. the model straight up fails at later stages, generating incomplete svgs. this is with a LOT of re-tries. also has issue of "lining up the points" to specific locations.',
    'gameboy_svgs' : 'this was better than expected. again with some trouble understanding relative positions so I give up fidgeting the geometries. I kept the color green as it is cute.',
}