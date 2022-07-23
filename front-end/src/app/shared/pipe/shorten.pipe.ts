import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: string, maxLength: number = 150): string {
        if (value.length <= maxLength) {
            return value;
        }

        return value.substring(0, maxLength) + '...';
    }
}