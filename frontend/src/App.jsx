import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import * as XLSX from "xlsx";

import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import { fetchJobs, createJob, updateJob, deleteJob } from "./services/api";

function App() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [error, setError] = useState(null);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs(statusFilter || undefined);
      setJobs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleAddClick = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("确定要删除这条记录吗？")) return;
    try {
      await deleteJob(id);
      await loadJobs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id, formData);
      } else {
        await createJob(formData);
      }
      setShowForm(false);
      await loadJobs();
    } catch (err) {
      setError(err.message);
    }
  };
const handleExport = () => {
  const exportData = jobs.map((job, index) => ({
    "Nr.": index + 1,
    "Firma": job.company_name,
    "Position": job.position_title,
    "Status": job.status,
    "Bewerbungsdatum": job.application_date || "",
    "Standort": job.location || "",
    "Quelle": job.source || "",
    "Ansprechpartner": job.contact_person || "",
    "E-Mail": job.contact_email || "",
    "Gehaltsspanne": job.salary_range || "",
    "Nachfassdatum": job.follow_up_date || "",
    "Notizen": job.notes || "",
  }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bewerbungen");

    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `Bewerbungen_${today}.xlsx`);
  };

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h2>求职跟踪 <span className="text-muted fs-6">共 {jobs.length} 条</span></h2>
        </Col>
        <Col xs="auto">
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: "160px", display: "inline-block", marginRight: "10px" }}
          >
            <option value="">全部状态</option>
            <option value="applied">已投递</option>
            <option value="interview">面试中</option>
            <option value="offer">已录用</option>
            <option value="rejected">已拒绝</option>
            <option value="withdrawn">已撤回</option>
          </Form.Select>
          <Button variant="outline-success" className="me-2" onClick={handleExport}>
          导出Excel
          </Button>
          <Button onClick={handleAddClick}>+ 新增</Button>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <JobList jobs={jobs} onEdit={handleEditClick} onDelete={handleDelete} />

      <JobForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
        editingJob={editingJob}
      />
    </Container>
  );
}

export default App;
