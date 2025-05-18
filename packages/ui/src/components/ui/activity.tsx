import { cn } from "@ui/lib/utils";

const Activity = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const ActivityHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={cn(
        "container flex w-full flex-col justify-end gap-2 mt-3 px-6",
        className,
      )}
      {...props}
    />
  );
};

const ActivityContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <main className="flex h-full grow flex-col items-center overflow-y-scroll pt-2">
      <section
        className={cn(
          "flex w-full grow flex-col justify-center gap-7",
          className,
        )}
        {...props}
      >
        {children}
      </section>
    </main>
  );
};

const ActivityFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <footer className={className} {...props} />;
};

Activity.displayName = "Activity";
ActivityHeader.displayName = "ActivityHeader";
ActivityContent.displayName = "ActivityContent";
ActivityFooter.displayName = "ActivityFooter";

export { Activity, ActivityContent, ActivityFooter, ActivityHeader };
