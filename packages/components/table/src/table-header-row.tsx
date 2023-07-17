import type {GridNode} from "@react-types/grid";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx} from "@nextui-org/shared-utils";
import {useTableHeaderRow} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";

import {ValuesType} from "./use-table";

// @internal
export interface TableHeaderRowProps<T = object> extends HTMLNextUIProps<"tr"> {
  /**
   * The table node to render.
   */
  node: GridNode<T>;
  slots: ValuesType["slots"];
  state: ValuesType["state"];
  classNames?: ValuesType["classNames"];
}

const TableHeaderRow = forwardRef<TableHeaderRowProps, "tr">((props, ref) => {
  const {as, className, children, node, slots, classNames, state, ...otherProps} = props;

  const Component = as || "tr";
  const domRef = useDOMRef(ref);

  const {rowProps} = useTableHeaderRow({node}, state, domRef);

  const trStyles = clsx(classNames?.tr, className, node.props?.className);

  return (
    <Component
      ref={domRef}
      {...mergeProps(rowProps, filterDOMProps(node.props, {labelable: true}), otherProps)}
      className={slots.tr?.({class: trStyles})}
    >
      {children}
    </Component>
  );
});

TableHeaderRow.displayName = "NextUI.TableHeaderRow";

export default TableHeaderRow;