
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * Collapsible Root Component
 * Container for collapsible content
 */
const Collapsible = CollapsiblePrimitive.Root;

/**
 * Trigger component that toggles the collapsible content
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

/**
 * Component that contains the content to be collapsed/expanded
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
