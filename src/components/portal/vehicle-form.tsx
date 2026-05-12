"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createVehicle, type VehicleResult } from "@/lib/actions/vehicles";
import { VEHICLE_KIND_LABELS, SIZE_LABELS } from "@/types/domain";

export function VehicleForm() {
  const [state, formAction, isPending] = useActionState<VehicleResult | null, FormData>(
    createVehicle,
    null,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="kind">Type</Label>
          <Select name="kind" defaultValue="car">
            <SelectTrigger id="kind">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(VEHICLE_KIND_LABELS).map(([v, l]) => (
                <SelectItem key={v} value={v}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="size_category">Size</Label>
          <Select name="size_category" defaultValue="midsize">
            <SelectTrigger id="size_category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(["compact", "midsize", "large", "xl", "xxl"] as const).map(
                (s) => (
                  <SelectItem key={s} value={s}>
                    {SIZE_LABELS[s]}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            type="number"
            min={1900}
            max={2030}
            placeholder="2020"
          />
        </div>
        <div>
          <Label htmlFor="make">Make</Label>
          <Input id="make" name="make" placeholder="Ford" />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" placeholder="F-150" />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input id="color" name="color" placeholder="Black" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="vin_or_hin">VIN / HIN (optional)</Label>
          <Input id="vin_or_hin" name="vin_or_hin" maxLength={20} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Pet hair, leather seats, ceramic-coated, lift access, etc."
          />
        </div>
      </div>
      {state && !state.ok && (
        <p className="text-xs text-destructive">{state.message}</p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            Saving…
          </>
        ) : (
          "Save vehicle"
        )}
      </Button>
    </form>
  );
}
