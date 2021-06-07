import * as chai from 'chai';
import * as spies from 'chai-spies';
import { resolve } from 'path';
import { readDocFxJson } from '../../../../controllers/metadata/docfx-file-parser';
import { DocFxMetadata } from '../../../../controllers/metadata/docfx-metadata';

chai.use(spies);
const expect = chai.expect;

suite('DocFX file parser', () => {
	// Reset and tear down the spies
	teardown(() => {
		chai.spy.restore(readDocFxJson);
	});

	test('readDocFxJson correctly caches file', () => {
		const spy = chai.spy.on(readDocFxJson, 'tryFindFile');
		const filePath = resolve(__dirname, '../../../../../src/test/data/repo/docfx.json');
		let docFxMetadata: DocFxMetadata = readDocFxJson(filePath);

		expect(spy).to.have.been.called.once;
		docFxMetadata = readDocFxJson(filePath);

		// It should have been cached, and only called once.
		expect(spy).to.have.been.called.once;
	});
});
