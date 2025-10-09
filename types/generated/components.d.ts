import type { Schema, Struct } from '@strapi/strapi';

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
    displayName: 'Subcriteria';
    icon: 'bulletList';
  };
  attributes: {
    code: Schema.Attribute.String;
    desc: Schema.Attribute.String;
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
    approver: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    fileName: Schema.Attribute.String;
    fileStatus: Schema.Attribute.Enumeration<
      ['On-going Review', 'Reviewed', 'Approved', 'Declined']
    >;
    fileUpload: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    remarks: Schema.Attribute.Text;
    uploader: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface UploadsSubcriteriaUploads extends Struct.ComponentSchema {
  collectionName: 'components_uploads_subcriteria_uploads';
  info: {
    displayName: 'Subcriteria Uploads';
  };
  attributes: {
    approver: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    fileName: Schema.Attribute.String;
    fileStatus: Schema.Attribute.Enumeration<
      ['On-going Review', 'Reviewed', 'Approved', 'Declined']
    >;
    fileUpload: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    remarks: Schema.Attribute.Text;
    uploader: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'criteria.criteria': CriteriaCriteria;
      'subcriteria.subcriteria': SubcriteriaSubcriteria;
      'uploads.criteria-uploads': UploadsCriteriaUploads;
      'uploads.subcriteria-uploads': UploadsSubcriteriaUploads;
    }
  }
}
