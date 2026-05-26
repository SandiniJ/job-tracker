import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import StatsBar from '../components/StatsBar';
import styles from './Dashboard.module.css';

const STATUSES = ['All', 'Applied', 'Interview', 'Offer', 'Rejected', 'Ghosted'];

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleSave = async (form) => {
    if (editJob) {
      await axios.put(`/api/jobs/${editJob.id}`, form);
    } else {
      await axios.post('/api/jobs', form);
    }
    fetchJobs();
    setEditJob(null);
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return;
    await axios.delete(`/api/jobs/${id}`);
    setJobs(jobs.filter(j => j.id !== id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditJob(null);
  };

  const filtered = jobs.filter(j => {
    const matchStatus = filter === 'All' || j.status === filter;
    const matchSearch =
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.position.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Applications</h1>
          <p className={styles.sub}>Track every opportunity in one place</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Application
        </button>
      </div>

      <StatsBar jobs={jobs} />

      <div className={styles.controls}>
        <input
          className={styles.search}
          placeholder="Search company or role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.filters}>
          {STATUSES.map(s => (
            <button
              key={s}
              className={`${styles.filterBtn} ${filter === s ? styles.active : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={styles.empty}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>{jobs.length === 0 ? 'No applications yet.' : 'No results match your filter.'}</p>
          {jobs.length === 0 && (
            <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setShowModal(true)}>
              Add your first application
            </button>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(job => (
            <JobCard key={job.id} job={job} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showModal && (
        <JobModal
          job={editJob}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
