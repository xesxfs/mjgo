package com.vequn.nets.http;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshaker;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshakerFactory;
import io.netty.util.CharsetUtil;

public class HttpHandler {
	public static WebSocketServerHandshaker handler(ChannelHandlerContext ctx, FullHttpRequest msg,
			WebSocketServerHandshaker shaker, int port, String host) {
		return handlerHttpRequest(ctx, msg, shaker, port, host);
	}

	private static void sendHttpResponse(ChannelHandlerContext ctx, FullHttpRequest msg, DefaultFullHttpResponse res) {
		// 返回应答给客户端
		if (res.status().code() != 200) {
			ByteBuf buf = Unpooled.copiedBuffer(res.status().toString(), CharsetUtil.UTF_8);
			res.content().writeBytes(buf);
			buf.release();
		}
		// 如果是非Keep-Alive，关闭连接
		ChannelFuture f = ctx.channel().writeAndFlush(res);
		if (!isKeepAlive(msg) || res.status().code() != 200) {
			f.addListener(ChannelFutureListener.CLOSE);
		}
	}

	private static boolean isKeepAlive(FullHttpRequest msg) {
		return false;
	}

	private static WebSocketServerHandshaker handlerHttpRequest(ChannelHandlerContext ctx, FullHttpRequest msg,
			WebSocketServerHandshaker shaker, int port, String host) {
		if (!msg.decoderResult().isSuccess() || (!"websocket".equals(msg.headers().get("Upgrade")))) {
			sendHttpResponse(ctx, msg,
					new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.BAD_REQUEST));
			return null;
		}

		WebSocketServerHandshakerFactory wsFactory = new WebSocketServerHandshakerFactory(
				"ws://" + host + ":" + port + "/websocket", null, false);
		shaker = wsFactory.newHandshaker(msg);
		if (shaker == null) {
			WebSocketServerHandshakerFactory.sendUnsupportedVersionResponse(ctx.channel());
		} else {
			shaker.handshake(ctx.channel(), msg);
		}
		return shaker;
	}
}
