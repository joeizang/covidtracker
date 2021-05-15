

export default function arrayFetcher(sequence: any[], takeLimit: number) {
    const arrayLength = sequence.length;
    //let sliceMark = (arrayLength - takeLimit) -1;
    const numberOfItemsInResultStructure = Math.ceil(arrayLength / takeLimit);
    const resultStructure = [];
    // const firstSequence = sequence.slice(takeLimit - 1);
    // next fetch from where first stopped
    // const nextSequence = sequence.slice(takeLimit - 1, takeLimit + (takeLimit - 1));

    for (let index = 1; index < numberOfItemsInResultStructure; index++) {
        if (index == 1) {
            resultStructure.push(sequence.slice(takeLimit - index));
        }
        if (index > 1) {
            resultStructure.push(sequence.slice(takeLimit - index, takeLimit + (takeLimit - 1)));
        }
    }
    return resultStructure;
}