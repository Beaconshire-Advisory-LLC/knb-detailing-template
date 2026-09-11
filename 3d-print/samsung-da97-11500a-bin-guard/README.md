# Samsung DA97-11500A door-bin guard — 3D-printable replacement

Parametric OpenSCAD model and ready-to-slice STLs for the clear U-shaped
fence ("Assy Guard-Ref Bottle", Samsung part **DA97-11500A**) that keeps
condiments in the fresh-food door bins of the Samsung **RSG307AARS/XAA**
side-by-side (also RSG307AABP/AAWP and RSG309AARS).

![full model](preview/full_iso.png)

## Short answer

Yes, this part can be printed. The body is a simple U-shaped wall with a
flared rim, which prints well. Everything that matters for fit is in the
mounting features — the two snap tabs under the front rail and the hook
tongue at the top-rear corner of each leg — and those are exactly the
features that are broken off the sample in the photos, so their dimensions
could **not** be taken from the pictures. The model has them as parameters
with placeholder values. **Print the tab test coupon first**, check it in
the door, adjust, then print the big pieces.

## What is in this folder

| File | What it is |
|---|---|
| `bin_guard.scad` | The parametric source. Every dimension is a named variable at the top. |
| `render.sh` | Regenerates every STL below from the `.scad`. |
| `stl/bin_guard_full.stl` | One-piece part, 435 × 138 × 84 mm. Needs a bed at least 440 mm in one direction. |
| `stl/bin_guard_2pc_left.stl`, `_right.stl` | Two halves with a dovetail joint. Largest footprint 228 × 138 mm — fits 250/256 mm beds (Bambu X1/P1, Prusa MK4). |
| `stl/bin_guard_3pc_left.stl`, `_middle.stl`, `_right.stl` | Three pieces with two dovetail joints. Largest footprint 158 × 138 mm — fits a 220 × 220 bed (Ender-3 class). |
| `stl/tab_test_coupon.stl` | 60 mm slice of rail with one snap tab and two short legs with tongues. Print this first to verify the fit. |
| `preview/*.png` | Renders of the model. |

## Dimensions and where they came from

Measured = scaled from the tape-measure photos. The front-view photo (tape and
rail bottom both at counter level) is the reference for width and height; the
close-up top-down photos exaggerate anything at rim height by roughly 30 %,
so they were only used for proportions. Accuracy about ±3 mm (±1/8 in).
Assumed = chosen for print strength or not visible in the photos.

| Parameter | Default | Basis |
|---|---|---|
| `width` (rail outer width) | 419 mm (16-1/2 in) | measured, front-view photo. Retail listings quote 15-1/2 in "at the rear"; if the door pocket measures that, set `width=394`. |
| `leg` (rail outer face to leg end) | 110 mm (4-3/8 in) | measured |
| `height` (wall height) | 70 mm (2-3/4 in) | measured |
| `corner` (front corner radius, plan view) | 15 mm | measured |
| `lip` (outward rim width along the top) | 8 mm | measured; the original rim is a rolled bead, modeled here as a flat flange |
| `wall`, `lip_thk` | 2.4 mm | assumed; the original is ~2 mm. 2.4 mm = six 0.4 mm perimeters |
| `tab_w`, `tab_h` | 35 × 14 mm | measured from the two tab stubs on the rail |
| `tab_spacing` (centre to centre) | 110 mm (4-3/8 in) | measured |
| `tab_nub`, `tab_nub_h` (snap ridge on the tab) | 1.5 × 3 mm | **assumed**. The stubs show the ridge is gone; measure the lip it snaps over. |
| `tongue_len`, `tongue_h`, `tongue_z` | 20 × 18 mm, flush with the top | **assumed**. Both tongues are broken off at the top-rear corner of the legs. |
| `hook_drop` | 0 (plain tongue) | **assumed**. Set to the ledge height if the tongue hooks down over a ledge on the door liner. |

## Before printing the full part — measurement checklist

Take these off the door liner (and the one remaining good guard, if any of the
three still has its tabs), then edit the variables at the top of `bin_guard.scad`:

1. **Rail width.** Inside width of the door-liner pocket the guard sits in, minus
   about 1 mm total clearance. Confirms `width`.
2. **Wall height.** Confirms `height`.
3. **What the leg tongues engage.** On the door liner, at the height of the guard's
   top edge, find the slot or ledge the top-rear corner of each leg hooks into.
   Slot depth → `tongue_len`, slot height → `tongue_h`, slot width → `tongue_thk`
   (subtract 0.2 mm for clearance). If it is a ledge the tongue hooks *over*, set
   `hook_drop` to the ledge thickness plus 0.3 mm.
4. **What the front tabs snap onto.** Thickness of the bin lip or liner rail the
   tabs hook under → `tab_nub` (ridge depth) and `tab_h`.
5. **Rim profile.** The OEM rim is a rounded bead about 8 mm wide. A flat flange
   is stronger and prints without support; say so if you want the bead modeled.

Render the coupon and test-fit:

```sh
openscad -o stl/tab_test_coupon.stl -D 'part="coupon"' bin_guard.scad
```

Or override values on the command line without editing the file:

```sh
openscad -o stl/tab_test_coupon.stl -D 'part="coupon"' -D tongue_len=30 -D hook_drop=6 bin_guard.scad
```

Regenerate all pieces after the coupon fits:

```sh
./render.sh
```

## Print settings

* **Material: PETG** (first choice) or ASA. Both stay tough at fridge temperature and
  survive the repeated flexing that the snap tabs see. Avoid PLA — it goes brittle
  when cold and the tabs will break the same way the originals did. Clear or
  natural PETG gives a look close to the OEM part.
* **Orientation: rim down.** Place the part upside down so the 8 mm rim lies flat
  on the bed. The tabs then point up and the tongues lie flat at bed level, so
  nothing needs support. Layer lines run horizontally along the rail, the strong
  direction for a long rail under bending.
* 0.2 mm layers, 0.4 mm nozzle, 6 perimeters (the walls are 2.4 mm so they print as
  solid perimeters), 4 top/bottom layers, infill irrelevant.
* Brim of 5 mm on the long pieces; PETG this long will lift at the corners without it.
* Slow first layer, bed at 80 °C for PETG.

## Assembling the split versions

The pieces join with dovetails in the rail wall (0.2 mm clearance). Dry-fit
first; if the joint is tight, sand the tail lightly or re-render with
`-D clearance=0.3`. Glue with a PETG-compatible adhesive (CA with activator,
or a two-part epoxy) and clamp straight along a table edge while it cures.
The joints sit in the plain rail, away from the tabs, so glue strength is not
what holds the guard to the door.

![dovetail joint](preview/joint_iso.png)

## OEM price check (September 2026)

Retail listings put the OEM part in the same range you quoted, e.g. $81.25 at
[FiltersFast](https://www.filtersfast.com/p-samsung-da97-11500a-refrigerator-accessory.asp).
Other sellers: [PartSelect](https://www.partselect.com/PS4176345-Samsung-DA97-11500A-Door-Bin.htm?ModelNum=RSG307AARS&ModelID=7099303),
[Sears PartsDirect](https://www.searspartsdirect.com/product/35rk9kjz6r-0046-401/id-da97-11500a),
[Samsung Parts USA](https://samsungpartsusa.com/products/da97-11500a),
[eBay](https://www.ebay.com/itm/387086406652).
Printed cost is roughly 120 cm³ of PETG per guard, about 150 g, or $4 to $6 of
filament each.
