var CANV_WIDTH = 1300;
var CANV_HEIGHT = 700;

var IMG_MOD_W = 246;

var debug_img = null;

// ========== BIG STACK OF GLOBAL VARS LUL ==========

// keep track of the drawing mode
var MODE_TELEPHONE = 'telephone';
var MODE_MODIFY = 'modify';

// hard code some ranges for diff modes
var MODE_TELEPHONE_RANGE = [1, 14];
var MODE_MODIFY_RANGE = [1, 11];

var mode = MODE_TELEPHONE;
var generation_idx = 1;

// the konva layer
var layer = null;
// render a image on the canvas
function render_image(image_path, location_x, location_y, width, height) {
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
        debug_img = image;
        layer.add(image);
        layer.draw();
    };
    imageObj.src = image_path;
}

function draw_modify(generation_idx) {
    // change the text at '#generation-id' to display 'generation ' + generation_idx
    $('#generation-id').text('with modification, generation ' + generation_idx);
    
    // first draw the background
    render_image('assets/background-mod.png', 0, 0, CANV_WIDTH, CANV_HEIGHT);
    
    // draw the lower-right of the previous iteration
    var prev_gen_idx = generation_idx - 1;
    render_image('assets/telephone-mod/' + prev_gen_idx + '_draw2.jpg', 38, 195, IMG_MOD_W, IMG_MOD_W);
    // draw the describe of this generation
    render_image('assets/telephone-mod/' + generation_idx + '_describe.jpg', 385, 67, IMG_MOD_W, IMG_MOD_W);
    // draw the 'draw_1' of this generation
    render_image('assets/telephone-mod/' + generation_idx + '_draw1.jpg', 735, 67, IMG_MOD_W, IMG_MOD_W);
    // draw the 'modify' of this generation
    render_image('assets/telephone-mod/' + generation_idx + '_modify.jpg', 417, 415, IMG_MOD_W, IMG_MOD_W);
    // draw the 'draw_2' of this generation
    render_image('assets/telephone-mod/' + generation_idx + '_draw2.jpg', 797, 415, IMG_MOD_W, IMG_MOD_W);
}

function draw_telephone(generation_idx) {
    // change the text at '#generation-id' to display 'generation ' + generation_idx
    $('#generation-id').text('no modification, generation ' + generation_idx);
    
    // first draw the background
    render_image('assets/background.png', 0, 0, CANV_WIDTH, CANV_HEIGHT);
    
    // draw the lower-right of the previous iteration
    var prev_gen_idx = generation_idx - 1;
    render_image('assets/telephone/' + prev_gen_idx + '_draw.jpg', 38, 195, IMG_MOD_W, IMG_MOD_W);
    // draw the describe of this generation
    render_image('assets/telephone/' + generation_idx + '_describe.jpg', 385, 67, IMG_MOD_W, IMG_MOD_W);
    // draw the 'draw' of this generation
    render_image('assets/telephone/' + generation_idx + '_draw.jpg', 735, 67, IMG_MOD_W, IMG_MOD_W);
}

// rerender all the shapes resulting from the action sequence
function render_state() {
    // clear everything
    layer.destroyChildren();
    // draw the things
    // check the mode
    if (mode == MODE_TELEPHONE) {
        // draw the telephone
        draw_telephone(generation_idx);
    } else if (mode == MODE_MODIFY) {
        // draw the modify
        draw_modify(generation_idx);
    }

}



// on document ready
$(document).ready(function() {

    // add the logic on the prev/next buttons
    $('#prev').click(function() {
        // if mode is modify, then the range is [1, 11]
        var range = null;
        if (mode == MODE_TELEPHONE) {
            range = MODE_TELEPHONE_RANGE;
        } else if (mode == MODE_MODIFY) {
            range = MODE_MODIFY_RANGE;
        }
        if (generation_idx > range[0]) {
            generation_idx -= 1;
            render_state();
        }
    });
    $('#next').click(function() {
        // if mode is modify, then the range is [1, 11]
        var range = null;
        if (mode == MODE_TELEPHONE) {
            range = MODE_TELEPHONE_RANGE;
        } else if (mode == MODE_MODIFY) {
            range = MODE_MODIFY_RANGE;
        }
        if (generation_idx < range[1]) {
            generation_idx += 1;
            render_state();
        }
    });

    $('#switch').click(function() {
        // switch the mode
        if (mode == MODE_TELEPHONE) {
            mode = MODE_MODIFY;
        } else if (mode == MODE_MODIFY) {
            mode = MODE_TELEPHONE;
        }
        // // reset the generation_idx
        // generation_idx = 1;
        // rerender the state
        render_state();
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