import { UI_SYNC } from "../../../core/models/types";
import { socket } from "../../api/socket";
import { getLocalId } from "../../id";
import type { GlobalId } from "../../id";

import { aurasFromServer, partialAuraFromServer } from "./conversion";
import type { Aura, AuraId, ServerAura } from "./models";

import { auraSystem } from ".";

socket.on("Shape.Options.Aura.Remove", (data: { shape: GlobalId; value: AuraId }) => {
    const shape = getLocalId(data.shape);
    if (shape === undefined) return;
    auraSystem.remove(shape, data.value, UI_SYNC);
});

socket.on("Shape.Options.Aura.Move", (data: { shape: GlobalId; aura: AuraId; new_shape: GlobalId }): void => {
    const shape = getLocalId(data.shape);
    const newShape = getLocalId(data.new_shape);
    if (shape === undefined || newShape === undefined) return;
    const aura = auraSystem.get(shape, data.aura, false);
    if (aura === undefined) return;

    auraSystem.remove(shape, aura.uuid, UI_SYNC);
    auraSystem.add(newShape, aura, UI_SYNC);
});

socket.on("Shape.Options.Aura.Create", (data: ServerAura): void => {
    const shape = getLocalId(data.shape);
    if (shape === undefined) return;
    auraSystem.add(shape, aurasFromServer(data)[0], UI_SYNC);
});

socket.on("Shape.Options.Aura.Update", (data: { uuid: string; shape: GlobalId } & Partial<Aura>): void => {
    const shape = getLocalId(data.shape);
    if (shape === undefined) return;
    auraSystem.update(shape, data.uuid, partialAuraFromServer(data), UI_SYNC);
});
