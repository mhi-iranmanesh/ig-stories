import { Injectable } from '@nestjs/common';
import {IgApiClient} from "instagram-private-api";
const ig = new IgApiClient();


async function login(username: string, password: string) {
    ig.state.generateDevice(username);
    ig.request.end$.subscribe(async () => {
        const serialized = await ig.state.serialize();
        delete serialized.constants; // this deletes the version info, so you'll always use the version provided by the library
    });

    return await ig.account.login(username, password);
}

@Injectable()
export class AppService {
    async get_stories(username:string) {
        await login('m_naderi1990', '123456Abcdef');
        const usernameId = await ig.user.getIdByUsername(username)
        const stories = await ig.feed.userStory(usernameId).request()
        console.log(JSON.stringify(stories))
        return stories
    }

    getHello(): string {
        return 'Hello World!';
    }
}
