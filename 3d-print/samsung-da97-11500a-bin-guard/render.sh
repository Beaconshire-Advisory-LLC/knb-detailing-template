#!/bin/sh
# Regenerate every STL from bin_guard.scad. Run after editing the parameters.
cd "$(dirname "$0")" && mkdir -p stl
openscad -o stl/bin_guard_full.stl       -D 'part="full"'                  bin_guard.scad
openscad -o stl/bin_guard_2pc_left.stl   -D 'part="left"'   -D segments=2 bin_guard.scad
openscad -o stl/bin_guard_2pc_right.stl  -D 'part="right"'  -D segments=2 bin_guard.scad
openscad -o stl/bin_guard_3pc_left.stl   -D 'part="left"'   -D segments=3 bin_guard.scad
openscad -o stl/bin_guard_3pc_middle.stl -D 'part="middle"' -D segments=3 bin_guard.scad
openscad -o stl/bin_guard_3pc_right.stl  -D 'part="right"'  -D segments=3 bin_guard.scad
openscad -o stl/tab_test_coupon.stl      -D 'part="coupon"'                bin_guard.scad
