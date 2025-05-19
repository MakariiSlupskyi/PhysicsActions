import { ChevronDown, ChevronLeft, ChevronUp, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useMissileStore from "../../../stores/missileStore";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import usePlanetStore from "@/stores/planetStore";


const menuStyles = "rounded-lg border border-neutral-700 bg-neutral-900 text-white shadow-xl";

const Menu = () => {
  const { getMissile, selectMissile, selectedId } = useMissileStore();  

  return (
    <>
    { selectedId === undefined ? <BasicMenu /> : <MissileMenu /> }
    </>
  )
}

const MissileMenu = () => {
  const { selectedId, selectMissile } = useMissileStore();
  const missile = useMissileStore((s) => s.missiles.find(i => i.id === selectedId));
  const update = useMissileStore((s) => s.updateSelectedData);  

  if (!missile) return <div>Select an item</div>

  return (
    <div
      className="fixed top-3 left-3 z-50 flex gap-2"
      style={{ width: 320 }}
    >
      <div className="bg-background rounded-lg shadow-xl border overflow-auto max-h-[90vh] resize-x">
        <Accordion type="multiple">
          <AccordionItem value="angles">
            <AccordionTrigger className="px-3 py-1.5">Missile settings</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="bg-muted h-[1px]" />
              <div className="space-y-4 px-3">
                <div className="flex justify-between">
                  <Label>Mass</Label>
                  <span className="text-muted-foreground">{missile.data.mass}</span>
                </div>
                <Slider key={missile.id} defaultValue={[missile.data.mass]} min={1} max={20} step={1} onValueChange={([v]) => update({ mass: v })} />

              </div>
              
              <div className="bg-muted h-[1px]" />
              
              <div className="space-y-4 px-3">
                <div className="flex justify-between">
                  <Label>Velocity</Label>
                  <span className="text-muted-foreground">{missile.data.vel}</span>
                </div>
                <Slider key={missile.id} defaultValue={[missile.data.vel]} min={1} max={20} step={1} onValueChange={([v]) => update({ vel: v })} />
              </div>
              
              <div className="bg-muted h-[1px] mb-3" />
              
              <div className="space-y-4 px-3">
                <div className="flex justify-between">
                  <Label>Rotation</Label>
                  <span className="text-muted-foreground">{missile.data.phiDeg}</span>
                </div>
                <Slider key={missile.id} defaultValue={[missile.data.phiDeg]} min={1} max={20} step={1} onValueChange={([v]) => update({ phiDeg: v })} />
              </div>

              <div className="bg-muted h-[1px]" />
              
              <div className="space-y-4 px-3">
                <div className="flex justify-between">
                  <Label>Elevation angle</Label>
                  <span className="text-muted-foreground">{missile.data.alphaDeg}</span>
                </div>
                <Slider key={missile.id} defaultValue={[missile.data.alphaDeg]} min={1} max={20} step={1} onValueChange={([v]) => update({ alphaDeg: v })} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Button
          className="bg-background text-muted-foreground hover:bg-muted border"
          size={"icon"} onClick={() => {selectMissile('-1')}}
        >
          <ChevronLeft color="#d4d4d4" size={20} />
        </Button>
      </div>

      <div>
        <Button variant={"default"} size={"icon"} onClick={() => {}}>
          <Play color="#111" size={20} />
        </Button>
      </div>
    </div>
  )
}

const BasicMenu = () => {
  const { mass, speed, radius, setMass, setSpeed, setRadius } = usePlanetStore();

  return (
    <div
      className="fixed top-3 left-3 z-50 flex gap-2"
      style={{ width: 320 }}
    >
      <div className="bg-background rounded-lg shadow-xl border overflow-auto max-h-[90vh] resize-x">
        <Accordion type="multiple">
          <AccordionItem value="angles">
            <AccordionTrigger className="px-3 py-1.5">Settings</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="bg-muted h-[1px]" />
              <div className="space-y-4 px-3">
                <div className="flex justify-between">
                  <Label>Mass</Label>
                  <span className="text-muted-foreground">{mass}</span>
                </div>
                <Slider defaultValue={[mass]} min={1} max={20} step={1} onValueChange={([newMass]) => setMass(newMass)} />
              </div>
              <div className="bg-muted h-[1px]" />
              <div className="space-y-4 px-3">
                <div className="flex justify-between">
                  <Label>Speed</Label>
                  <span className="text-muted-foreground">{speed}</span>
                </div>
                <Slider defaultValue={[speed]} min={1} max={20} step={1} onValueChange={([newSpeed]) => setSpeed(newSpeed)} />
              </div>
              <div className="bg-muted h-[1px] mb-3" />
              <div className="space-y-4 px-3">
                <div className="flex justify-between">
                  <Label>Radius</Label>
                  <span className="text-muted-foreground">{radius}</span>
                </div>
                <Slider defaultValue={[radius]} min={1} max={10} step={1} onValueChange={([newRadius]) => setRadius(newRadius)} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Link to="/">
          <Button className="bg-background text-muted-foreground hover:bg-muted border" size={"icon"}>
            <ChevronLeft color="#d4d4d4" size={20} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Menu;
