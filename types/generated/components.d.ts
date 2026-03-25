import type { Schema, Struct } from '@strapi/strapi';

export interface CoveredAreasRoleList extends Struct.ComponentSchema {
  collectionName: 'components_covered_areas_role_lists';
  info: {
    displayName: 'Role List';
  };
  attributes: {
    allowedCriteria: Schema.Attribute.Text;
    area_with_permission: Schema.Attribute.String;
  };
}

export interface CoveredProgramsCoveredPrograms extends Struct.ComponentSchema {
  collectionName: 'components_covered_programs_covered_programs';
  info: {
    displayName: 'Covered Programs';
  };
  attributes: {
    academic_program: Schema.Attribute.Relation<
      'oneToOne',
      'api::academic-program.academic-program'
    >;
  };
}

export interface CriteriaCriteria extends Struct.ComponentSchema {
  collectionName: 'components_criteria_criteria';
  info: {
    description: '';
    displayName: 'Criteria';
    icon: 'bulletList';
  };
  attributes: {
    code: Schema.Attribute.String;
    criteriaUploads: Schema.Attribute.Component<
      'uploads.criteria-uploads',
      true
    >;
    desc: Schema.Attribute.Text;
    subcriteria: Schema.Attribute.Component<'subcriteria.subcriteria', true>;
  };
}

export interface SubcriteriaSubcriteria extends Struct.ComponentSchema {
  collectionName: 'components_subcriteria_subcriteria';
  info: {
    description: '';
    displayName: 'Subcriteria';
    icon: 'bulletList';
  };
  attributes: {
    code: Schema.Attribute.String;
    desc: Schema.Attribute.Text;
    subCriteriaUploads: Schema.Attribute.Component<
      'uploads.subcriteria-uploads',
      true
    >;
  };
}

export interface UploadsCriteriaUploads extends Struct.ComponentSchema {
  collectionName: 'components_uploads_criteria_uploads';
  info: {
    description: '';
    displayName: 'Criteria Uploads';
    icon: 'file';
  };
  attributes: {
    academic_program: Schema.Attribute.Relation<
      'oneToOne',
      'api::academic-program.academic-program'
    >;
    academic_year: Schema.Attribute.Relation<
      'oneToOne',
      'api::academic-year.academic-year'
    >;
    approver: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    campus: Schema.Attribute.Relation<'oneToOne', 'api::campus.campus'>;
    fileName: Schema.Attribute.String;
    fileStatus: Schema.Attribute.Enumeration<
      ['On-going Review', 'Reviewed', 'Approved', 'Declined']
    >;
    fileUpload: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    remarks: Schema.Attribute.Text;
    semester: Schema.Attribute.Relation<'oneToOne', 'api::semester.semester'>;
    uploader: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    visit: Schema.Attribute.Relation<'oneToOne', 'api::visit-type.visit-type'>;
  };
}

export interface UploadsSubcriteriaUploads extends Struct.ComponentSchema {
  collectionName: 'components_uploads_subcriteria_uploads';
  info: {
    displayName: 'Subcriteria Uploads';
  };
  attributes: {
    academic_program: Schema.Attribute.Relation<
      'oneToOne',
      'api::academic-program.academic-program'
    >;
    academic_year: Schema.Attribute.Relation<
      'oneToOne',
      'api::academic-year.academic-year'
    >;
    approver: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    campus: Schema.Attribute.Relation<'oneToOne', 'api::campus.campus'>;
    fileName: Schema.Attribute.String;
    fileStatus: Schema.Attribute.Enumeration<
      ['On-going Review', 'Reviewed', 'Approved', 'Declined']
    >;
    fileUpload: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    remarks: Schema.Attribute.Text;
    semester: Schema.Attribute.Relation<'oneToOne', 'api::semester.semester'>;
    uploader: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    visit: Schema.Attribute.Relation<'oneToOne', 'api::visit-type.visit-type'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'covered-areas.role-list': CoveredAreasRoleList;
      'covered-programs.covered-programs': CoveredProgramsCoveredPrograms;
      'criteria.criteria': CriteriaCriteria;
      'subcriteria.subcriteria': SubcriteriaSubcriteria;
      'uploads.criteria-uploads': UploadsCriteriaUploads;
      'uploads.subcriteria-uploads': UploadsSubcriteriaUploads;
    }
  }
}
