import { useParams } from "@remix-run/react";
import { Alert } from "~/components/globals/Alert";
import { ProjectGoalForm } from "~/components/pages/projectGoal/ProjectGoalForm";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetProjectGoal } from "~/hooks/projectGoal/useGetProjectGoal";

export default function Index () {
  const params = useParams()
  const goalId = params.goalId as string

  const { error, loading, projectGoal } = useGetProjectGoal(goalId)
  return (
    <>
      {error && <Alert variant="error" description={error.message} />}
      {loading && <Skeleton className="w-full" />}
      <div className="w-full">
        <ProjectGoalForm projectGoal={projectGoal} />
      </div>
    </>
  )
}