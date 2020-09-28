/* eslint-disable @typescript-eslint/no-explicit-any */
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import {FILE_UPLOAD_SERVICE} from '../key';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Attachments, Cases} from '../models';
import {CasesRepository} from '../repositories';
import {FileUploadHandler} from '../types';
import {Roles} from './specs/user-controller.specs';


@authenticate('jwt')
export class CasesAttachmentsController {
  constructor(
    @repository(CasesRepository) protected casesRepository: CasesRepository,
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  ) {}


  @post('/cases/{id}/attachments', {
    responses: {
      '200': {
        description: 'Cases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Attachments)}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof Cases.prototype.id,
    @requestBody.file() request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<Object> {

    const filesPromise = new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: unknown) => {
        if (err) reject(err);
        else {
          resolve(CasesAttachmentsController.getFilesAndFields(request));
        }
      });
    });

    const requestContext = (await filesPromise) as any;

    const attachment = new Attachments({link: requestContext.files[0].originalname, name: requestContext.fields.name, description: requestContext.fields.description})

    return this.casesRepository.attachments(id).create(attachment);
  }

  @get('/cases/{id}/attachments', {
    responses: {
      '200': {
        description: 'Array of Cases has many Attachments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Attachments)},
          },
        },
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_VIEW],
    voters: [basicAuthorization],
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Attachments>,
  ): Promise<Attachments[]> {
    return this.casesRepository.attachments(id).find(filter);
  }

  @patch('/cases/{id}/attachments', {
    responses: {
      '200': {
        description: 'Cases.Attachments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attachments, {partial: true}),
        },
      },
    })
    attachments: Partial<Attachments>,
    @param.query.object('where', getWhereSchemaFor(Attachments)) where?: Where<Attachments>,
  ): Promise<Count> {
    return this.casesRepository.attachments(id).patch(attachments, where);
  }

  @del('/cases/{id}/attachments', {
    responses: {
      '200': {
        description: 'Cases.Attachments DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Attachments)) where?: Where<Attachments>,
  ): Promise<Count> {
    return this.casesRepository.attachments(id).delete(where);
  }

  /**
  * Get files and fields for the request
  * @param request - Http request
  */
  private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return {files, fields: request.body};
  }
}
