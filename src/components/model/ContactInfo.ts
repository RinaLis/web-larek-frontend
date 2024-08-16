import { IContactInfo, TContactInfo } from "../../types";
import { IEvents } from "../base/events";

export class ContactInfo implements IContactInfo {
    protected _email: string;
    protected _phone: string;
    protected events: IEvents;

    constructor(events: IEvents) {
		this.events = events;
	}

    get email() {
        return this._email
    }

    get phone() {
        return this._phone
    }

    checkValidation(data: Record<keyof TContactInfo, string>): boolean {
        if (data.email !== '' && data.phone !== '') {
            return true
        }
        this.events.emit('contacts:validation')
        return false
    }

    setInfo(data: TContactInfo): void {
        this._email = data.email;
        this._phone = data.phone;
    }
}