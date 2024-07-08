import { createElement } from 'lwc';
import CreateContact from 'c/createContact';
import insertContact from '@salesforce/apex/ContactController.createContact';

const mockErrorInsertedRecords = require("./data/createdContactErrorMock.json");
const mockInsertedRecords = require("./data/createdContactMock.json");

jest.mock(
    '@salesforce/apex/ContactController.createContact',
        () => {
            return {
                default: jest.fn()
            };
        },
        { virtual: true }
);

describe('c-create-contact', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    async function flushPromises() {
        return Promise.resolve();
    }


    it('User didnt fill out required fields', async () => {
        // Arrange
        const element = createElement('c-create-contact', {
            is: CreateContact
        });

        // Act
        document.body.appendChild(element);

        insertContact.mockRejectedValue(mockErrorInsertedRecords);

        let btn = element.shadowRoot.querySelector('lightning-button');
        btn.click();

        await flushPromises();

        let results = element.shadowRoot.querySelector('[data-id="results"]').innerText;

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(results).toBe('Error occurred!');
        
    });

    it('User filled out all fields required', async () => {
        // Arrange
        const element = createElement('c-create-contact', {
            is: CreateContact
        });

        // Act
        document.body.appendChild(element);

        insertContact.mockResolvedValue(mockInsertedRecords);

        let btn = element.shadowRoot.querySelector('lightning-button');
        btn.click();

        await flushPromises();

        let results = element.shadowRoot.querySelector('[data-id="results"]').innerText;

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(results).toBe('Contact created!');
    });
});