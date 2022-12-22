var CANV_WIDTH = 1896 / 2;
var CANV_HEIGHT = 1092 / 2;

var IMG_MOD_W = 205;

var debug_img = null;

// ========== BIG STACK OF GLOBAL VARS LUL ==========

// hard code some ranges for diff modes
var DISPLAY_RANGE = [1, 34];

var generation_idx = 1;

// the konva layer
var layer = null;
// render a image on the canvas
function render_image(image_path, location_x, location_y, width, height, z_index) {
    var imageObj = new Image();
    imageObj.onload = function() {
        var image = new Konva.Image({
            x: location_x,
            y: location_y,
            image: imageObj,
            width: width,
            height: height,
            draggable: true
        });
        // if (z_index) {
        //     image.setZIndex(z_index);
        // }
        debug_img = image;
        layer.add(image);
        layer.draw();

        // yeah screw this asynch bullshit
        var txt_to_render = texts[generation_idx-1];
        render_text(txt_to_render, 355, 268, IMG_MOD_W / 4 * 5, IMG_MOD_W / 2, 1);
        console.log('text rendered');
    };
    imageObj.src = image_path;
}

// render a string on the canvas
function render_text(text_string, location_x, location_y, width, height) {
    var text = new Konva.Text({
        x: location_x,
        y: location_y,
        text: text_string,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black',
        width: width,
        height: height,
        align: 'center',
        draggable: true
    });
    layer.add(text);
    // make sure the text is always on top
    text.moveToTop();
    layer.draw();
}

function draw_modify(generation_idx) {
    // change the text at '#generation-id' to display 'generation ' + generation_idx
    $('#generation-id').text('generation ' + generation_idx);
    // if generation is last, display "done " after the text
    if (generation_idx == DISPLAY_RANGE[1]) {
        $('#generation-id').text($('#generation-id').text() + ' done');
    }

    
    // first draw the background
    render_image('assets/background.png', 0, 0, CANV_WIDTH, CANV_HEIGHT, 2);
    // draw the goal
    render_image('assets/goal.png', 669, 44, IMG_MOD_W, IMG_MOD_W, 1);



    render_image('assets/generations_svgs/' + generation_idx + '.svg', 670, 306, IMG_MOD_W, IMG_MOD_W, 1);
    render_image('assets/generations_svgs/' + (generation_idx - 1) + '.svg', 65, 306, IMG_MOD_W, IMG_MOD_W, 1);

    
    // // draw the lower-right of the previous iteration
    // var prev_gen_idx = generation_idx - 1;
    // // draw the describe of this generation
    // render_image('assets/telephone-mod/' + generation_idx + '_describe.jpg', 385, 67, IMG_MOD_W, IMG_MOD_W);
    // // draw the 'draw_1' of this generation
    // render_image('assets/telephone-mod/' + generation_idx + '_draw1.jpg', 735, 67, IMG_MOD_W, IMG_MOD_W);
    // // draw the 'modify' of this generation
    // render_image('assets/telephone-mod/' + generation_idx + '_modify.jpg', 417, 415, IMG_MOD_W, IMG_MOD_W);
    // // draw the 'draw_2' of this generation
    // render_image('assets/telephone-mod/' + generation_idx + '_draw2.jpg', 797, 415, IMG_MOD_W, IMG_MOD_W);
}

// rerender all the shapes resulting from the action sequence
function render_state() {
    // clear everything
    layer.destroyChildren();
    draw_modify(generation_idx);

}



// on document ready
$(document).ready(function() {

    // add the logic on the prev/next buttons
    $('#prev').click(function() {
        // if mode is modify, then the range is [1, 11]
        var range = DISPLAY_RANGE;
        if (generation_idx > range[0]) {
            generation_idx -= 1;
            render_state();
        }
    });
    $('#next').click(function() {
        // if mode is modify, then the range is [1, 11]
        var range = DISPLAY_RANGE;
        if (generation_idx < range[1]) {
            generation_idx += 1;
            render_state();
        }
    });

    // make a new konva stage
    var stage = new Konva.Stage({
        container: 'konva-holder',
        width: CANV_WIDTH,
        height: CANV_HEIGHT,
    });

    // add a layer and add to stage
    layer = new Konva.Layer();
    stage.add(layer);

    // render state
    render_state();
});