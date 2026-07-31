import Viewport from '../builtin-simulator/viewport';
import { ISimulatorHost } from '../simulator';

export function isElementNode(domNode: Element) {
  return domNode.nodeType === Node.ELEMENT_NODE;
}

/**
 * Check whether a node is inside the viewport; true if any part overlaps, otherwise false
 * @param domNode node to check
 * @param viewport canvas viewport
 * @returns whether inside viewport
 */
export function isDOMNodeVisible(domNode: Element, viewport: Viewport) {
  const domNodeRect = domNode.getBoundingClientRect();
  const { width, height } = viewport.contentBounds;
  const { left, right, top, bottom, width: nodeWidth, height: nodeHeight } = domNodeRect;
  return (
    left >= -nodeWidth &&
    top >= -nodeHeight &&
    bottom <= height + nodeHeight &&
    right <= width + nodeWidth
  );
}

/**
 * normalize triggers
 * @param triggers
 */
export function normalizeTriggers(triggers: string[]) {
  return triggers.map((trigger: string) => trigger?.toUpperCase());
}

/**
 * make a handler that listen all sensors:document, avoid frame lost
 */
 export function makeEventsHandler(
  boostEvent: MouseEvent | DragEvent,
  sensors: ISimulatorHost[],
): (fn: (sdoc: Document) => void) => void {
  const topDoc = window.document;
  const sourceDoc = boostEvent.view?.document || topDoc;
  const docs = new Set<Document>();
  docs.add(topDoc);
  docs.add(sourceDoc);
  sensors.forEach((sim) => {
    const sdoc = sim.contentDocument;
    if (sdoc) {
      docs.add(sdoc);
    }
  });

  return (handle: (sdoc: Document) => void) => {
    docs.forEach((doc) => handle(doc));
  };
}