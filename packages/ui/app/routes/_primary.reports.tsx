import { ChartInstitutionsWithProjects } from "~/components/pages/reports/InstitutionsCreated";
import { ProjectsNeedAttention } from "~/components/pages/reports/ProjectsNeedAttention";
import { Title } from "~/components/typography/Headers";
import { withAuth } from "~/helpers/withAuth";

export const loader = withAuth()

export default function Index () {
  return (
    <div className="h-full w-full">
      <div className="flex">
        <div className="flex flex-col gap-2 flex-grow">
          <Title variant={"h2"}>Instituciones con proyectos en curso</Title>
          <ChartInstitutionsWithProjects />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <Title variant={"h2"}>Programas que requieren atencion</Title>
          <ProjectsNeedAttention />
        </div>
      </div>
    </div>
  )
}