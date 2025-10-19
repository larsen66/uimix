import { ReactNode } from "react";

interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props?: Prop[];
  children?: ReactNode;
}

interface PropRowProps {
  children: ReactNode;
}

interface PropProps {
  name: string;
  type: string;
  default?: string;
  optional?: boolean;
  children: ReactNode;
}

export const PropsTable = ({ props, children }: PropsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 font-medium">Prop</th>
            <th className="text-left p-3 font-medium">Type</th>
            <th className="text-left p-3 font-medium">Default</th>
            <th className="text-left p-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props ? (
            props.map((prop, index) => (
              <tr key={index} className="border-b border-border/50">
                <td className="p-3 font-mono text-sm bg-muted/50 rounded">
                  {prop.name}
                </td>
                <td className="p-3 font-mono text-sm text-muted-foreground">
                  {prop.type}
                </td>
                <td className="p-3 font-mono text-sm text-muted-foreground">
                  {prop.default || '-'}
                </td>
                <td className="p-3 text-sm">
                  {prop.description}
                </td>
              </tr>
            ))
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
};

const PropsTableRow = ({ children }: PropRowProps) => {
  return <>{children}</>;
};
PropsTableRow.displayName = "PropsTable.Row";
PropsTable.Row = PropsTableRow;

const PropsTableProp = ({ name, type, default: defaultValue, optional, children }: PropProps) => {
  return (
    <tr className="border-b border-border/50">
      <td className="p-3 font-mono text-sm bg-muted/50 rounded">
        {name}
      </td>
      <td className="p-3 font-mono text-sm text-muted-foreground">
        {type}
      </td>
      <td className="p-3 font-mono text-sm text-muted-foreground">
        {defaultValue || (optional ? 'undefined' : '-')}
      </td>
      <td className="p-3 text-sm">
        {children}
      </td>
    </tr>
  );
};
PropsTableProp.displayName = "PropsTable.Prop";
PropsTable.Prop = PropsTableProp;
