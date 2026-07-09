import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

// Maps a status value to a Bootstrap badge color
const STATUS_VARIANT = {
  applied: "secondary",
  interview: "warning",
  offer: "success",
  rejected: "danger",
  withdrawn: "dark",
};

const STATUS_EMPLOYMENT_TYPE = {
  Praktikum: "secondary",
  Vollzeit: "info",
  Teilzeit: "primary",
};

function JobList({ jobs, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return <p className="text-muted">暂无求职记录，点击右上角"新增"添加一条。</p>;
  }

  return (
    <Table striped bordered hover responsive className="jobs_table">
      <thead>
        <tr>
          <th>#</th>
          <th>公司</th>
          <th>职位</th>
          <th>状态</th>
          <th>雇佣类型</th>
          <th>申请日期</th>
          <th>地点</th>
          <th>渠道</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr key={job.id}>
            <td>{index + 1}</td>
            <td>{job.company_name}</td>
            <td>{job.position_title}</td>
            <td>
              <Badge bg={STATUS_VARIANT[job.status] || "secondary"}>{job.status}</Badge>
            </td>
            <td>
              <Badge bg={STATUS_EMPLOYMENT_TYPE[job.employment_type] || "Light"} text = "dark">{job.employment_type}</Badge>
            </td>
            <td>{job.application_date || "-"}</td>
            <td>{job.location || "-"}</td>
            <td>{job.source || "-"}</td>
            <td>
              <Button size="sm" variant="outline-primary" className="me-2" onClick={() => onEdit(job)}>
                编辑
              </Button>
              <Button size="sm" variant="outline-danger" onClick={() => onDelete(job.id)}>
                删除
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default JobList;
