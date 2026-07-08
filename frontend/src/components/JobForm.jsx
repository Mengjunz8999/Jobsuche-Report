import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EMPTY_JOB = {
  company_name: "",
  position_title: "",
  intern_fulltime:"",
  job_url: "",
  location: "",
  status: "applied",
  employment_type: "",
  application_date: "",
  source: "",
  contact_person: "",
  contact_email: "",
  salary_range: "",
  notes: "",
  follow_up_date: "",
};

function JobForm({ show, onClose, onSave, editingJob }) {
  const [formData, setFormData] = useState(EMPTY_JOB);

  // Load the selected job into the form when editing, reset when adding new
  useEffect(() => {
    setFormData(editingJob ? { ...EMPTY_JOB, ...editingJob } : EMPTY_JOB);
  }, [editingJob, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editingJob ? "编辑求职记录" : "新增求职记录"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>公司名称 *</Form.Label>
              <Form.Control
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>职位名称 *</Form.Label>
              <Form.Control
                name="position_title"
                value={formData.position_title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>雇佣类型</Form.Label>
              <Form.Select name="employment_type" value={formData.employment_type || ""} onChange={handleChange}>
                <option value="Praktikum">Praktikum</option>
                <option value="Teilzeit">Teilzeit</option>
                <option value="Vollzeit">Vollzeit</option>
              
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>状态</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="applied">已投递</option>
                <option value="interview">面试中</option>
                <option value="offer">已录用</option>
                <option value="rejected">已拒绝</option>
                <option value="withdrawn">已撤回</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>申请日期</Form.Label>
              <Form.Control
                type="date"
                name="application_date"
                value={formData.application_date || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>跟进日期</Form.Label>
              <Form.Control
                type="date"
                name="follow_up_date"
                value={formData.follow_up_date || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>地点</Form.Label>
              <Form.Control name="location" value={formData.location || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>渠道来源</Form.Label>
              <Form.Control
                name="source"
                placeholder="LinkedIn / 公司官网 / 内推 ..."
                value={formData.source || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>薪资范围</Form.Label>
              <Form.Control name="salary_range" value={formData.salary_range || ""} onChange={handleChange} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>联系人</Form.Label>
              <Form.Control
                name="contact_person"
                value={formData.contact_person || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>联系邮箱</Form.Label>
              <Form.Control
                type="email"
                name="contact_email"
                value={formData.contact_email || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>职位链接</Form.Label>
            <Form.Control name="job_url" value={formData.job_url || ""} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>备注</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            取消
          </Button>
          <Button variant="primary" type="submit">
            保存
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default JobForm;
