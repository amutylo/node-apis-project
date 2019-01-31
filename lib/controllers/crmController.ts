import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

//Create contact model from ContactSchema.
const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {
    //Add new contact method.
    public addNewContact(req: Request, res: Response) {
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    //Get contacts method.
    public getContacts(req: Request, res: Response) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    //Get contact by an id
    public getContactWithID(req: Request, res: Response) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    //Update contact by an id.
    public updateContact(req: Request, res: Response) {
        Contact.findOneAndUpdate(
            { _id: req.params.contactId },
            req.body,
            { new: true },
            (err, contact) => {
                if (err) {
                    res.send(err);
                }
                res.json(contact);
            }
        );
    }

    //Delete contact by an id.
    public deleteContact(req: Request, res: Response) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }
}
