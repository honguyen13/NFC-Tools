import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

export const _parseUri = tag => {
  try {
    if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
      return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const _parseText = tag => {
  try {
    if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
      return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const readNdef = async () => {
  try {
    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);
    // the resolved tag object will contain `ndefMessage` property
    const tag = await NfcManager.getTag();
    return tag;
    // const x = await NfcManager.ndefHandler.getNdefMessage();
  } catch (ex) {
    console.log('Oops!', ex);
  }
};

export const writeNFC = async () => {
  let result = false;

  try {
    // STEP 1
    await NfcManager.requestTechnology(NfcTech.Ndef);

    const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);

    if (bytes) {
      await NfcManager.ndefHandler // STEP 2
        .writeNdefMessage(bytes); // STEP 3
      result = true;
    }
  } catch (ex) {
    console.warn(ex);
  } finally {
    // STEP 4
    NfcManager.cancelTechnologyRequest();
  }

  return result;
};
