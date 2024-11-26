import { useState } from 'react';
import { useTrans } from '@react-libs/hooks';
import { FormDataModal } from '../add';
import StudentView from './StudentView';
import TeacherView from './TeacherView';

const FormDataListContainer = () => {
  const trans = useTrans();
  const [view, setView] = useState<'student' | 'teacher'>('student'); // Toggle between student and teacher views

  const tabs = [
    {
      title: trans('Data_student'),
      link: '/form_data_student',
      session: 'formDataStudents',
      icon: 'fas fa-user-graduate',
      visible: true, // Adjust this based on your conditions
    },
    {
      title: trans('Data_teacher'),
      link: '/form_data_teacher',
      session: 'formDataTeachers',
      icon: 'fas fa-chalkboard-teacher',
      visible: true, // Adjust this based on your conditions
    },
  ];

  return (
    <div className="card card-info">
      <div className="card-header">
        <div className="card-title text-capitalize">{trans('form_datas_list_page')}</div>
        <div className="card-tools">
          <FormDataModal />
        </div>
      </div>

      <div className="card-body">
        {/* Tab Navigation */}
        <ul className="nav nav-tabs">
          {tabs
            .filter((tab) => tab.visible) // Only show visible tabs
            .map((tab, index) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${view === tab.session ? 'active' : ''}`}
                  href={tab.link}
                  onClick={(e) => {
                    e.preventDefault();
                    setView(tab.session === 'formDataStudents' ? 'student' : 'teacher');
                  }}
                >
                  <i className={tab.icon}></i> {tab.title}
                </a>
              </li>
            ))}
        </ul>

        {/* Render either Student or Teacher view based on the selection */}
        {view === 'student' ? <StudentView /> : <TeacherView />}
      </div>
    </div>
  );
};

export default FormDataListContainer;
