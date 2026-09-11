// ===========================================================================
//  Samsung DA97-11500A  "Assy Guard-Ref Bottle"  (RSG307 / RSG309 side-by-side)
//  3D-printable replacement for the clear door-bin fence / guard
//
//  Coordinate system (mm):
//     X = across the door (rail width), centred on 0
//     Y = depth; rail OUTER face at y = 0, legs run toward +Y (toward the door)
//     Z = up;    bottom edge of the wall at z = 0
//
//  Render one part at a time:
//     openscad -o stl/bin_guard_full.stl        -D 'part="full"'   bin_guard.scad
//     openscad -o stl/bin_guard_split_left.stl  -D 'part="left"'   bin_guard.scad
//     openscad -o stl/bin_guard_split_middle.stl -D 'part="middle"' bin_guard.scad
//     openscad -o stl/bin_guard_split_right.stl -D 'part="right"'  bin_guard.scad
//     openscad -o stl/tab_test_coupon.stl       -D 'part="coupon"' bin_guard.scad
//  Override any dimension the same way, e.g.  -D width=520 -D tongue_len=30
// ===========================================================================

part = "full";        // [full, left, middle, right, coupon]

// ---- Main body -----------------------------------------------------------
//  "measured" = scaled from the tape-measure photos (about +/- 3 mm)
//  "ASSUMED"  = not determinable from the photos - measure before printing
width       = 528;    // measured  rail outer width            (~20-13/16 in)
leg         = 140;    // measured  leg length, rail outer face to leg end (~5-1/2 in)
height      = 70;     // measured  wall height                 (~2-3/4 in)
wall        = 2.4;    // assumed   wall thickness (orig ~2 mm; 2.4 = 6 x 0.4 mm lines)
corner      = 20;     // measured  outer plan-view radius of the two front corners

// ---- Top rim (outward flange) -------------------------------------------
lip         = 10;     // measured  rim width past the outer wall face
lip_thk     = 2.4;    // assumed   rim thickness

// ---- Snap tabs hanging below the front rail ------------------------------
tab_w       = 45;     // measured  tab width
tab_h       = 18;     // measured  how far the tab hangs below the wall bottom
tab_spacing = 130;    // measured  centre-to-centre distance between the two tabs
tab_nub     = 1.5;    // assumed   snap ridge depth on the tab's inner (door-side) face
tab_nub_h   = 3;      // assumed   snap ridge height

// ---- Tongues at the rear end of each leg (into the door-liner slots) ------
tongue_len  = 25;     // ASSUMED   length past the leg end  - measure the liner slot depth
tongue_h    = 20;     // ASSUMED   tongue height            - measure the liner slot height
tongue_z    = 5;      // ASSUMED   tongue bottom above the wall bottom
tongue_thk  = 2.4;    // assumed   tongue thickness         - measure the liner slot width

// ---- Splitting for small print beds (left / middle / right) ---------------
segments      = 3;    // number of segments the "left/middle/right" parts assume
dovetail_len  = 10;   // dovetail length along X
dovetail_neck = 28;   // dovetail height at the joint face
dovetail_tip  = 38;   // dovetail height at the tip
clearance     = 0.2;  // socket clearance (increase if the joint is too tight)

$fn = 64;
eps = 0.01;
big = 4 * width;

// ---------------------------------------------------------------------------
//  2-D helpers
// ---------------------------------------------------------------------------
// Rectangle w x l (front edge on y=0), rounded only on the two FRONT corners.
module u_outline(w, l, r) {
    hull() {
        if (r > 0) {
            translate([-w/2 + r, r]) circle(r);
            translate([ w/2 - r, r]) circle(r);
        } else {
            translate([-w/2, 0]) square([w, 1]);
        }
        translate([-w/2, l - 1]) square([w, 1]);
    }
}

// The U-shaped wall footprint: outer outline minus an inner outline that is
// open at the back (y = leg).
module u_wall_2d(w, l, r, t) {
    difference() {
        u_outline(w, l, r);
        translate([0, t]) u_outline(w - 2*t, l + 50, max(r - t, 0));
    }
}

// Outward rim footprint - a band 'lip' wide outside the outer wall face,
// squared off at the leg ends.
module u_lip_2d(w, l, r, t) {
    intersection() {
        difference() {
            offset(r = lip) u_outline(w, l, r);
            offset(delta = -eps) u_outline(w, l, r);
        }
        translate([-big/2, -big/2]) square([big, big/2 + l]);
    }
}

// ---------------------------------------------------------------------------
//  3-D body
// ---------------------------------------------------------------------------
module guard(w = width, l = leg, r = corner, spacing = tab_spacing) {
    t = wall;
    union() {
        // wall
        linear_extrude(height) u_wall_2d(w, l, r, t);

        // top rim
        translate([0, 0, height - lip_thk])
            linear_extrude(lip_thk) u_lip_2d(w, l, r, t);

        // snap tabs under the front rail (co-planar with the rail wall)
        for (sx = (spacing > 0 ? [-1, 1] : [0]))
            translate([sx * spacing/2 - tab_w/2, 0, -tab_h]) {
                cube([tab_w, t, tab_h + eps]);
                if (tab_nub > 0)
                    translate([0, t - eps, 0]) cube([tab_w, tab_nub + eps, tab_nub_h]);
            }

        // tongues at the rear end of each leg (co-planar with the leg wall)
        for (sx = [-1, 1])
            translate([sx * (w/2 - t/2) - tongue_thk/2, l - eps, tongue_z])
                cube([tongue_thk, tongue_len + eps, tongue_h]);
    }
}

// ---------------------------------------------------------------------------
//  Dovetail joint (trapezoid in the XZ plane, 'wall' thick in Y, pointing +X)
// ---------------------------------------------------------------------------
module dovetail(x_cut, neck, tip, len, thk) {
    zc = height / 2;
    translate([0, thk, 0])
        rotate([90, 0, 0])
            linear_extrude(thk)
                polygon([[x_cut - eps, zc - neck/2],
                         [x_cut + len, zc - tip/2],
                         [x_cut + len, zc + tip/2],
                         [x_cut - eps, zc + neck/2]]);
}

function cut_x(i) = -width/2 + width * i / segments;   // i = 1 .. segments-1

module segment(i) {           // i = 0 .. segments-1
    x0 = (i == 0)            ? -big : cut_x(i);
    x1 = (i == segments - 1) ?  big : cut_x(i + 1);
    difference() {
        union() {
            intersection() {
                guard();
                translate([x0, -big/2, -big/2]) cube([x1 - x0, big, big]);
            }
            if (i < segments - 1)                              // tail on the right end
                dovetail(cut_x(i + 1), dovetail_neck, dovetail_tip, dovetail_len, wall);
        }
        if (i > 0)                                             // socket on the left end
            dovetail(cut_x(i), dovetail_neck + 2*clearance, dovetail_tip + 2*clearance,
                     dovetail_len + clearance, wall + 2*eps);
    }
}

// ---------------------------------------------------------------------------
//  Part selector
// ---------------------------------------------------------------------------
if (part == "full")   guard();
if (part == "left")   segment(0);
if (part == "middle") segment(1);
if (part == "right")  segment(segments - 1);
// 60 mm of rail with ONE centred tab + 40 mm legs with tongues: print this first
if (part == "coupon") guard(w = 60 + 2*wall, l = 40, r = 0, spacing = 0);
